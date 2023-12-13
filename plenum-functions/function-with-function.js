function functionWithFunctionParameter(functionParameter){
    console.log(functionParameter());
}
function anotherFunction(){
    return "Hello World!"
}
functionWithFunctionParameter(anotherFunction());

//functionWithFunctionParameter(() => "Hello World");