class Maps<T> {
    private items: { [key: string]: T };

    public constructor() {
        this.items = Object.create(null);
    }

    public set(key: string, value: T): void {
        this.items[key] = value;
    }

    public get(key: string): T {
        return this.items[key];
    }

    public remove(key: string): T {
        let value = this.get(key);
        delete this.items[key];
        return value;
    }
}
