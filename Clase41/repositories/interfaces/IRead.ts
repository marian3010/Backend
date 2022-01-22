export default interface IRead<T> {
    find(item: T): Promise<T[]>;
    
}