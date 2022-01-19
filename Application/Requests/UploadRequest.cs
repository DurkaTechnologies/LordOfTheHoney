using LordOfTheHoney.Application.Enums;

namespace LordOfTheHoney.Application.Requests
{
    public class UploadRequest
    {
        public string FileName { get; set; }
        public string Extension { get; set; }
        public UploadType UploadType { get; set; }
        public string Data { get; set; }
    }
}
