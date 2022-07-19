export default class Globals{

    public static Initialize() {
        Globals.applicationPath = __dirname;
    }

    public static applicationPath: string;
}