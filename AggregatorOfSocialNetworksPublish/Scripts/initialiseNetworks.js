$(function () {
    InitialiseFacebook(@System.Configuration.ConfigurationManager.AppSettings["FacebookAppId"]);
    //"FacebookAppId" - в Web.config: key="FacebookAppId" value="225062131301892
    InitialiseVkontakte(@System.Configuration.ConfigurationManager.AppSettings["VkontakteAppId"]);
    //"VkontakteAppId" - в Web.config: key="VkontakteAppId" value="6217691"
});