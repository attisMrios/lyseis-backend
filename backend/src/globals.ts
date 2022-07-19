export default class Globals{
    static Initialize() {
        Globals.applicationPath = __dirname;
    }
    public static applicationPath: string;
}