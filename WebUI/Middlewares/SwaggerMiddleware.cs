//using Microsoft.AspNetCore.Http;
//using Microsoft.Extensions.DependencyInjection;
//using LordOfTheHoney.Application.Interfaces.Services.Identity;
//using System;
//using System.Linq;
//using System.Net;
//using System.Threading.Tasks;

//namespace LordOfTheHoney.WebUI.Middlewares
//{
//    public class SwaggerMiddleware
//    {
//        private readonly RequestDelegate next;
//        private static readonly string HangFireCookieName = "SwaggerCookieName";
//        private static readonly int CookieExpirationMinutes = 1;
//        private string claimValue;

//        public SwaggerMiddleware(RequestDelegate next, string claimValue = null)
//        {
//            this.next = next;
//            this.claimValue = claimValue;
//        }

//        public async Task InvokeAsync(HttpContext httpContext)
//        {
//            //Make sure we are hitting the swagger path, and not doing it locally as it just gets annoying :-)
//            if (httpContext.Request.Path.StartsWithSegments("/swagger"))
//            {
//                var access_token = string.Empty;
//                var setCookie = false;
//                if (httpContext.Request.Query.ContainsKey("access_token"))
//                {
//                    access_token = httpContext.Request.Query["access_token"].FirstOrDefault();
//                    setCookie = true;
//                }
//                else
//                {
//                    access_token = httpContext.Request.Cookies[HangFireCookieName];
//                }
//                if (string.IsNullOrEmpty(access_token))
//                {

//                }
//                else
//                {
//                    try
//                    {
//                        var jwtFactory = httpContext.RequestServices.GetService(typeof(ITokenService)) as ITokenService;
//                        var principal = jwtFactory.GetPrincipalFromExpiredToken(access_token);
//                        if (string.IsNullOrEmpty(claimValue))
//                        {
//                            httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
//                            return;
//                        }
//                        if (principal != null)
//                        {
//                            var userService = httpContext.RequestServices.GetRequiredService<IUserService>();
//                            var userId = principal.GetUserId();
//                            if (!string.IsNullOrEmpty(userId))
//                            {
//                                var roleService = httpContext.RequestServices.GetRequiredService<IRoleService>();
//                                if (userRolesResponce.Succeeded)
//                                {
//                                    var findPermissions = false;
//                                    foreach (var role in userRolesResponce?.Data?.UserRoles)
//                                    {
//                                        var rolePermissions = await roleService.GetAllPermissionsAsync(role.RoleId);
//                                        if (rolePermissions.Succeeded)
//                                        {
//                                            var permisiions = rolePermissions.Data.RoleClaims.Where(item => item.Value == this.claimValue && item.Selected == true);
//                                            if (permisiions.Count() > 0)
//                                            {
//                                                findPermissions = true;
//                                                break;
//                                            }
//                                            else
//                                            {

//                                            }
//                                        }
//                                        else
//                                        {

//                                        }
//                                    }
//                                    if (findPermissions == false)
//                                    {

//                                    }
//                                    else
//                                    {
//                                        if (setCookie)
//                                        {
//                                            httpContext.Response.Cookies.Append(HangFireCookieName,
//                                            access_token,
//                                            new CookieOptions()
//                                            {
//                                                Path = "/swagger",
//                                                Secure = true,
//                                                Expires = DateTime.Now.AddMinutes(CookieExpirationMinutes)
//                                            });
//                                        }
//                                        await next.Invoke(httpContext);
//                                        return;
//                                    }
//                                }
//                                else
//                                {

//                                }
//                            }
//                            else
//                            {

//                            }
//                        }
//                        else
//                        {

//                        }
//                    }
//                    catch (Exception)
//                    {

//                    }
//                }
//                // Return unauthorized
//                httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
//            }
//            else
//            {
//                await next.Invoke(httpContext);
//            }
//        }

//        public bool IsLocalRequest(HttpContext context)
//        {
//            //Handle running using the Microsoft.AspNetCore.TestHost and the site being run entirely locally in memory without an actual TCP/IP connection
//            if (context.Connection.RemoteIpAddress == null && context.Connection.LocalIpAddress == null)
//            {
//                return true;
//            }
//            if (context.Connection.RemoteIpAddress.Equals(context.Connection.LocalIpAddress))
//            {
//                return true;
//            }
//            if (IPAddress.IsLoopback(context.Connection.RemoteIpAddress))
//            {
//                return true;
//            }
//            return false;
//        }
//    }
//}
