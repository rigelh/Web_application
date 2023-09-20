

let main = function (applet, msg)
{

  let _appletContext = applet.bindingDefaultContext;


  let buttonNotification,
  notificationModal,
  notificationModalList,
  dismissButton

  _appletContext.WorkspaceItems = new ArrayEx();
  Object.assign(_appletContext, {

  });
  let imp = {

    "PREROUTE": async function (){},
    "END_DRAW": async function ()
    {
 buttonNotification = applet.find("button_notification");
 notificationModal = applet.find("modal_notifications");
 notificationModalList = applet.find("Modal_list");
 dismissButton = applet.find("dismissButton");
  applet.addBehaviors( buttonNotification, {
      "click": {
          "SHOW_MODULE": {

          }
      }
  }, false);

  applet.addBehaviors( dismissButton, {
    "click": {
        "CLOSE_MODULE": {
           
        }
    }
}, false);

  createEventSource();


},

"CLOSE_MODULE": function ()
{
  notificationModal.hide();
},

"SHOW_MODULE": function ()
{
  notificationModal.show();
},
};

  let createEventSource = function ()
        {
          const eventSource = new EventSource('http://localhost:3000/notifications');
              const notificationList = [];
              notificationModalList.dataProvider = [];
          
              eventSource.onmessage = function (event) {
          
                const notificationMessage = JSON.parse(event.data);
                // Check if the notification ID is not already in the list
                if (!notificationList.includes(notificationMessage.id)) {
          
                  notificationList.push(notificationMessage.id);
                  // Push the new notification to your data provider (assuming it's an array)
                  notificationModalList.dataProvider.push(notificationMessage);
                }
              }
        }



  return imp;
};
export { main };
