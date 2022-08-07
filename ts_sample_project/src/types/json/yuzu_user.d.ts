declare module '*/json/yuzu_user.json' {
    interface YuzuUser {
        id: string;
        name: string;
        password: string;
    }

    const value: YuzuUser[];
    export = value;
}