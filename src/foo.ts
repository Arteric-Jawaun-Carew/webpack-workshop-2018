import { isConstructorDeclaration } from "typescript";

export default class Foo {
    public bar;

    contructor(){
        this.bar = "hi";
    }

}