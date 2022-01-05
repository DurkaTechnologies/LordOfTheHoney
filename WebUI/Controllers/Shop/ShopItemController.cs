using Domain.Enums;
using LordOfTheHoney.Application.Exceptions;
using LordOfTheHoney.Application.Features.ShopItem.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItem.Commands.Delete;
using LordOfTheHoney.Application.Features.ShopItem.Commands.Patch;
using LordOfTheHoney.Application.Features.ShopItem.Queries.GetAllPaged;
using LordOfTheHoney.Application.Features.ShopItem.Queries.GetById;
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
    [Route("api/shop/shopItem")]
    [ApiController]
    public class ShopItemController : BaseApiController<ShopItemController>
    {
        public ShopItemController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost("CreateShopItem")]
        [Authorize(Policy = Permissions.ShopItems.Create)]
        public async Task<IActionResult> CreateProductUnitByNames(CreateShopItemCommand command)
        {
            return Ok(await mediator.Send(command));
        }

        [HttpGet]
        [Authorize(Policy = Permissions.ShopItems.View)]
        public async Task<IActionResult> GetAllPagedShopItemsQuery(int pageNumber, int pageSize,
           string searchString, SortDirection sortDirection, CancellationToken cancellationToken)
        {
            var paginatedResult = await mediator.Send(new GetAllPagedShopItemsQuery(pageNumber, pageSize, searchString, sortDirection), cancellationToken);
            return Ok(paginatedResult);
        }

        [HttpGet("GetShopItemById")]
        [Authorize(Policy = Permissions.ShopItems.View)]
        public async Task<IActionResult> GetShopItemByIdQuery(int id)
        {
            try
            {
                var resultCommand = await mediator.Send(new GetShopItemByIdQuery(id));
                return Ok(resultCommand);
            }
            catch (NotFoundException notFoundException)
            {
                throw notFoundException;
            }
            catch (NullReferenceException)
            {
                return StatusCode(500, await Result.FailAsync("Shop Item not found!"));
            }
            catch (Exception error)
            {
                return StatusCode(500, await Result.FailAsync(error.Message));
            }
        }

        [HttpPatch]
        [Authorize(Policy = Permissions.ShopItems.Edit)]
        public async Task<IActionResult> PatchProductUnitOwner(PatchShopItemCommand command)
        {
            try
            {
                return Ok(await mediator.Send(command));
            }
            catch (NotFoundException)
            {
                return StatusCode(404, await Result.FailAsync($"Shop Item (id:{command.Id}) not found!"));
                //throw new NotFoundException(nameof(ShopItem), command);
            }
            catch (DbUpdateException error)
            {
                if (error.InnerException.Message.Contains("The duplicate key value is"))
                    return StatusCode(500, await Result.FailAsync("The reference for Shop Item must be unique!"));
                else
                    return StatusCode(500, await Result.FailAsync("Error patch Shop Item Owner!"));
            }
            catch (Exception error)
            {
                return StatusCode(500, await Result.FailAsync(error.Message));
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = Permissions.ShopItems.Delete)]
        public async Task<IActionResult> DeleteShopItemById(int id)
        {
            try
            {
                var resultCommand = await mediator.Send(new DeleteShopItemCommand(id));
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
