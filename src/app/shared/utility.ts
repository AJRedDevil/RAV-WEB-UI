

export class Utility {
    static sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}