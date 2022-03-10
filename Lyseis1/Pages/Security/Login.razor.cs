using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Lyseis.Classes;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using MudBlazor.Services;

namespace Lyseis.Pages.Security
{
    public partial class Login: IDisposable
    {
        [Inject] public NavigationManager Nav { get; set; }
        [Inject] IResizeListenerService ResizeListener { get; set; }

        private int Width { get; set; } = 0;
        public int Height { get; set; } = 0;
        private MudForm _form;
        private bool _success;
        private string[] errors = { };
        private MudTextField<string> _passwordField;

        private void LoginApp()
        {
            Globals.IsLogin = true;
            Nav.NavigateTo("/");
        }
        
        protected override async Task OnInitializedAsync()
        {
            await base.OnInitializedAsync();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                ResizeListener.OnResized += OnResized;

                var size = await ResizeListener.GetBrowserWindowSize();
                Height = size.Height - (64+64);
                Width = size.Width;
                StateHasChanged();
            }

            await base.OnAfterRenderAsync(firstRender);
        }

        private void OnResized(object sender, BrowserWindowSize size)
        {
            Height = size.Height - (64+64);
            InvokeAsync(StateHasChanged);
        }

        public void Dispose()
        {
            ResizeListener.OnResized -= OnResized;
        }
        
        private IEnumerable<string> PasswordStrength(string pw)
        {
            if (string.IsNullOrWhiteSpace(pw))
            {
                yield return "Password is required!";
                yield break;
            }
            if (pw.Length < 8)
                yield return "Password must be at least of length 8";
            if (!Regex.IsMatch(pw, @"[A-Z]"))
                yield return "Password must contain at least one capital letter";
            if (!Regex.IsMatch(pw, @"[a-z]"))
                yield return "Password must contain at least one lowercase letter";
            if (!Regex.IsMatch(pw, @"[0-9]"))
                yield return "Password must contain at least one digit";
        }

        private string PasswordMatch(string arg)
        {
            return _passwordField.Value != arg ? "Passwords don't match" : null;
        }
    }
}