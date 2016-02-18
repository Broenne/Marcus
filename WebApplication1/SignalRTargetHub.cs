using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1
{
    public class SignalRTargetHub : Hub
    {
        public void Hello()
        {
            this.Clients.Caller.logEvent(
                DateTime.UtcNow.ToLongTimeString(),
                "info",
                "SignalR connected");
        }

        static IHubContext signalRHub;
        public static void Send(string longdate, string logLevel, String message)
        {
            if (signalRHub == null)
            {
                signalRHub = GlobalHost.ConnectionManager.GetHubContext<SignalRTargetHub>();
            }
            if (signalRHub != null)
            {
                signalRHub.Clients.All.logEvent(longdate, logLevel, message);
            }
        }
    }
}