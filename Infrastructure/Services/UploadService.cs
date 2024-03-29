﻿using LordOfTheHoney.Application.Enums;
using LordOfTheHoney.Application.Extensions;
using LordOfTheHoney.Application.Interfaces.Services;
using LordOfTheHoney.Application.Requests;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BlazorHero.CleanArchitecture.Infrastructure.Services
{
    public class UploadService : IUploadService
    {
        public async Task<string> UploadAsync(UploadRequest request)
        {
            if (request.Data == null)
                return string.Empty;
                
            var fileBytes = Convert.FromBase64String(request.Data.Substring(request.Data.LastIndexOf(',') + 1));
            var streamData = new MemoryStream(fileBytes);

            if (streamData.Length > 0)
            {
                var folder = request.UploadType.ToDescriptionString();
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory() + "\\ClientApp\\public", folder);
                bool exists = Directory.Exists(pathToSave);

                if (!exists)
                    Directory.CreateDirectory(pathToSave);

                var fileName = request.FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folder, fileName);

                if (File.Exists(dbPath))
                {
                    dbPath = NextAvailableFilename(dbPath);
                    fullPath = NextAvailableFilename(fullPath);
                }

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await streamData.CopyToAsync(stream);
                }
                return dbPath;
            }
            else
            {
                return string.Empty;
            }
        }

        private static string numberPattern = " ({0})";

        public static string NextAvailableFilename(string path)
        {
            // Short-cut if already available
            if (!File.Exists(path))
                return path;

            // If path has extension then insert the number pattern just before the extension and return next filename
            if (Path.HasExtension(path))
                return GetNextFilename(path.Insert(path.LastIndexOf(Path.GetExtension(path)), numberPattern));

            // Otherwise just append the pattern to the path and return next filename
            return GetNextFilename(path + numberPattern);
        }

        private static string GetNextFilename(string pattern)
        {
            string tmp = string.Format(pattern, 1);
            //if (tmp == pattern)
            //throw new ArgumentException("The pattern must include an index place-holder", "pattern");

            if (!File.Exists(tmp))
                return tmp; // short-circuit if no matches

            int min = 1, max = 2; // min is inclusive, max is exclusive/untested

            while (File.Exists(string.Format(pattern, max)))
            {
                min = max;
                max *= 2;
            }

            while (max != min + 1)
            {
                int pivot = (max + min) / 2;
                if (File.Exists(string.Format(pattern, pivot)))
                    min = pivot;
                else
                    max = pivot;
            }

            return string.Format(pattern, max);
        }

        //public async Task<string> UploadByFormFileAsync(IFormFile formFile, UploadType uploadType, string fileName = null)
        //{
        //    if (formFile == null)
        //        return "";

        //    byte[] fileBytes = new byte[formFile.Length];

        //    using (var memoryStream = new MemoryStream())
        //    {
        //        formFile.CopyTo(memoryStream);
        //        fileBytes = memoryStream.ToArray();
        //    }

        //    UploadRequest request = new UploadRequest
        //    {
        //        Extension = Path.GetExtension(formFile.FileName),
        //        FileName = string.IsNullOrWhiteSpace(fileName) ? formFile.FileName : fileName,
        //        UploadType = uploadType,
        //        Data = fileBytes
        //    };

        //    try
        //    {
        //        return await UploadAsync(request);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
    }
}
