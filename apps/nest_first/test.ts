function test(input: number | string | boolean){
    if(typeof input == "string")
        console.log("Input is a string: " + input);
    else if (typeof input == "number")
        console.log("input is number")
    else if(typeof input == "boolean")
        console.log("input is boolean")
}

test("Hello, World!");
test(42);
test(true);