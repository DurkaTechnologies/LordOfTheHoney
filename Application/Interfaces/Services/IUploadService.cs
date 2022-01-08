using LordOfTheHoney.Application.Requests;

namespace LordOfTheHoney.Application.Interfaces.Services
{
    public interface IUploadService
    {
        string UploadAsync(UploadRequest request);
    }
}
