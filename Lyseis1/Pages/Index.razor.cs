using System;
using Lyseis.Classes;
using Lyseis.Shared;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Routing;

namespace Lyseis.Pages
{
    public partial class Index: IDisposable
    {

        [Inject] public NavigationManager nav { get; set; }

        public Index()
        {
            try
            { 
                nav.NavigateTo("/login");
                if (!Globals.IsLogin)
                {
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }



        protected override void OnInitialized()
        {
            // Subscribe to the event
            nav.LocationChanged += LocationChanged;
            base.OnInitialized();
        }
        void LocationChanged(object sender, LocationChangedEventArgs e)
        {
            string navigationMethod = e.IsNavigationIntercepted ? "HTML" : "code";
            System.Diagnostics.Debug.WriteLine($"Notified of navigation via {navigationMethod} to {e.Location}");
        }
        void IDisposable.Dispose()
        {
            // Unsubscribe from the event when our component is disposed
            nav.LocationChanged -= LocationChanged;
        }


        private void LogOut()
        {
            nav.NavigateTo("/login");
        }

    }
}