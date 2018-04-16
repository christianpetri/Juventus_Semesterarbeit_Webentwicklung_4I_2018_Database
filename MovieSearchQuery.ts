

export class MovieSearchQuery  {
    public id : number;
    public title : string;
    public numberOfMoviesFound : number;

    constructor(id: number, title: string, numberOfMoviesFound: number) {
        this.id = id;
        this.title = title;
        this.numberOfMoviesFound = numberOfMoviesFound;
    }
}
