using LordOfTheHoney.Application.Enums;
using LordOfTheHoney.Application.Requests;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Interfaces.Services
{
    public interface IUploadService
    {
        Task<string> UploadAsync(UploadRequest request);

        //Task<string> UploadByFormFileAsync(IFormFile formFile, UploadType uploadType, string fileName = null);
    }
}
