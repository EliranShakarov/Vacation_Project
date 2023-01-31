// URL'S definitions.
class Urls {
    //Users
    public static getAllUsersURL = "/all";
    public static getSingleUserURL = "/:unique_id";
    //Vacations
    public static getAllVacationsURL = "/all";
    public static getVacationByIdURL = "/by_id/:id";
    public static getVacationsByNameURL = "/by_name/:name";
    public static getVacationImageURL = "/images/:imageName";
    public static addNewVacationURL = "/add";
    public static deleteVacationURL = "/delete/:id";
    public static updateVacationURL = "/update/:id";
    //Following
    public static getAllFollowingForUserURL = "/all_for/:user_name";
    public static addNewFollowingURL = "/add";
    public static deleteFollowingURL = "/delete/:user_name&:vacation_id";
    //Auth
    public static registerURL = "/register";
    public static loginURL = "/login";
    public static relogURL = "/relog";
}

export default Urls;


