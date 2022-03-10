using System;
using System.Collections.Generic;
using Lyseis.Classes;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using MudBlazor.Utilities;

namespace Lyseis.Shared
{
    public partial class MainLayout
    {
        [Inject] public IDialogService Dialog { get; set; }
        [Inject] public NavigationManager nav { get; set; }
        private bool open { get; set; }

        private List<string> _menus = new List<string>()
        {
            "John Doe",
            "Jane Doe",
            "Joe Doe",
            "Jenna Doe",
            "Doggy Doe"
        };
        
        protected override void OnInitialized()
        {
            try
            {
                if (!Globals.IsLogin)
                {
                    nav.NavigateTo("/login");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
        void OpenDialog()
        {
            DialogOptions options = new DialogOptions();
            options.CloseButton = true;
            options.DisableBackdropClick = true;
            options.FullScreen = true;
            options.FullWidth = true;
            options.MaxWidth = MaxWidth.ExtraLarge;
            Dialog.Show<NavMenu>("Menú Principal", options);
        }

        void ToggleDrawer()
        {
            open = !open;
        }

        public MudTheme BlueAndWhite = new MudTheme()
        {
            Palette = new Palette()
            {
                Black = Colors.Shades.Black,
                White = Colors.Shades.White,
                Primary = "#594AE2",
                PrimaryContrastText = Colors.Shades.White,
                Secondary = Colors.Pink.Accent2,
                SecondaryContrastText = Colors.Shades.White,
                Tertiary = "#1EC8A5",
                TertiaryContrastText = Colors.Shades.White,
                Info = Colors.Blue.Default,
                InfoContrastText = Colors.Shades.White,
                Success = Colors.Green.Accent4,
                SuccessContrastText = Colors.Shades.White,
                Warning = Colors.Orange.Default,
                WarningContrastText = Colors.Shades.White,
                Error = Colors.Red.Default,
                ErrorContrastText = Colors.Shades.White,
                Dark = Colors.Grey.Darken3,
                DarkContrastText = Colors.Shades.White,
                TextPrimary = Colors.Grey.Darken3,
                TextSecondary = ColorManager.ToRgbaFromHex(Colors.Shades.Black, 0.54),
                TextDisabled = ColorManager.ToRgbaFromHex(Colors.Shades.Black, 0.38),
                ActionDefault = ColorManager.ToRgbaFromHex(Colors.Shades.Black, 0.54),
                ActionDisabled = ColorManager.ToRgbaFromHex(Colors.Shades.Black, 0.26),
                ActionDisabledBackground = ColorManager.ToRgbaFromHex(Colors.Shades.Black, 0.12),
                Background = Colors.Shades.White,
                BackgroundGrey = Colors.Grey.Lighten4,
                Surface = Colors.Shades.White,
                DrawerBackground = Colors.Shades.White,
                DrawerText = Colors.Grey.Darken3,
                DrawerIcon = Colors.Grey.Darken2,
                AppbarBackground = "#594AE2",
                AppbarText = Colors.Shades.White,
                LinesDefault = ColorManager.ToRgbaFromHex(Colors.Shades.Black, 0.12),
                LinesInputs = Colors.Grey.Lighten1,
                TableLines = ColorManager.ToRgbaFromHex(Colors.Grey.Lighten2, 1),
                TableStriped = ColorManager.ToRgbaFromHex(Colors.Shades.Black, 0.02),
                TableHover = ColorManager.ToRgbaFromHex(Colors.Shades.Black, 0.04),
                Divider = Colors.Grey.Lighten2,
                DividerLight = ColorManager.ToRgbaFromHex(Colors.Shades.Black, 0.8),
                HoverOpacity = 0.06,
                GrayDefault = Colors.Grey.Default,
                GrayLight = Colors.Grey.Lighten1,
                GrayLighter = Colors.Grey.Lighten2,
                GrayDark = Colors.Grey.Darken1,
                GrayDarker = Colors.Grey.Darken2,
                OverlayDark = ColorManager.ToRgbaFromHex("#212121", 0.5),
                OverlayLight = ColorManager.ToRgbaFromHex(Colors.Shades.White, 0.5)
            },
            Shadows = new Shadow()
            {
                Elevation = new string[]
                {
                    "none",
                    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
                    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
                    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
                    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
                    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
                    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
                    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
                    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
                    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
                    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
                    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
                    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
                    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
                    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
                    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
                    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
                    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
                    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
                    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
                    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
                    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
                    "0 5px 5px -3px rgba(0,0,0,.06), 0 8px 10px 1px rgba(0,0,0,.042), 0 3px 14px 2px rgba(0,0,0,.036)"
                }
            }
        };
        
        private void ChangeMenu()
        {
            this._menus = new List<string>()
            {
                "menu 1",
                "menu 2"
            };
        }

        private void Login()
        {
            nav.NavigateTo("/login");
        }
    }
}