using Domain.Enums;
using LordOfTheHoney.Application.Exceptions;
using LordOfTheHoney.Application.Features.ShopItemType.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItemType.Commands.Delete;
using LordOfTheHoney.Application.Features.ShopItemType.Commands.Patch;
using LordOfTheHoney.Application.Features.ShopItemType.Queries.GetAllPaged;
using LordOfTheHoney.Application.Features.ShopItemType.Queries.GetById;
using LordOfTheHoney.Domain.Entities.Catalog;
using LordOfTheHoney.Server.Controllers;
using LordOfTheHoney.Shared.Constants.Permission;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.WebUI.Controllers.Shop
{
    [Authorize]
    [Route("api/shop/shopItemType")]
    [ApiController]
    public class ShopItemTypeController : BaseApiController<ShopItemTypeController>
    {
        public ShopItemTypeController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost("CreateShopItemType")]
        [Authorize(Policy = Permissions.ShopItemTypes.Create)]
        public async Task<IActionResult> CreateProductUnitByNames(CreateShopItemTypeCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpGet]
        [Authorize(Policy = Permissions.ShopItemTypes.View)]
        public async Task<IActionResult> GetAllShopItemTypesQuery(SortDirection sortDirection, 
            CancellationToken cancellationToken)
        {
            var shopItemTypes = await mediator.Send(new GetAllShopItemTypesQuery(sortDirection), cancellationToken);
            return Ok(shopItemTypes);
        }

        [HttpGet("GetShopItemTypeById")]
        [Authorize(Policy = Permissions.ShopItemTypes.View)]
        public async Task<IActionResult> GetShopItemTypeByIdQuery(int id)
        {
            try
            {
                var resultCommand = await mediator.Send(new GetShopItemTypeByIdQuery(id));
                return Ok(resultCommand);
            }
            catch (NotFoundException notFoundException)
            {
                throw notFoundException;
            }
            catch (NullReferenceException)
            {
                return StatusCode(500, await Result.FailAsync("Shop Item Type not found!"));
            }
            catch (Exception error)
            {
                return StatusCode(500, await Result.FailAsync(error.Message));
            }
        }

        [HttpPatch]
        [Authorize(Policy = Permissions.ShopItemTypes.Edit)]
        public async Task<IActionResult> PatchProductUnitOwner(PatchShopItemTypeCommand command)
        {
            try
            {
                return Ok(await mediator.Send(command));
            }
            catch (NotFoundException)
            {
                return StatusCode(404, await Result.FailAsync($"Shop Item (id:{command.Id}) not found!"));
                //throw new NotFoundException(nameof(ShopItemType), command);
            }
            catch (DbUpdateException error)
            {
                if (error.InnerException.Message.Contains("The duplicate key value is"))
                    return StatusCode(500, await Result.FailAsync("The reference for Shop Item Type must be unique!"));
                else
                    return StatusCode(500, await Result.FailAsync("Error patch Shop Item Type Owner!"));
            }
            catch (Exception error)
            {
                return StatusCode(500, await Result.FailAsync(error.Message));
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = Permissions.ShopItemTypes.Delete)]
        public async Task<IActionResult> DeleteShopItemTypeById(int id)
        {
            try
            {
                var resultCommand = await mediator.Send(new DeleteShopItemTypeCommand(id));
                return Ok(resultCommand);
            }
            catch (NotFoundException notFoundException)
            {
                throw notFoundException;
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, await Result.FailAsync("This entity is used in another part of the program!"));
            }
            catch (Exception error)
            {
                return StatusCode(500, await Result.FailAsync(error.Message));
            }
        }
    }
}
