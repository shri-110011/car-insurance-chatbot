const jeffyBuysCake = cakeType => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            // resolve(cakeType);
            reject("Not bringing cake");
        }, 3000);
    });
}

const checkIfJeffyBringsCake = cake => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(cake)
            if(cake[0] === "Black Forest")
                resolve("Yes")
            else
                resolve("No")
        }, 2000)
    })
}

const actionNeeded = res => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(res === "Yes")
                resolve("No action needed")
            else    
                resolve("Execute the contingency plan")
        }, 3000)
    })
}

// const promise = jeffyBuysCake('blackForest')
//                 .then(cake => console.log("89 "+cake))
//                 .catch(noCake => console.log("88 "+noCake));

const promise =  (cakeType) => {
    return new Promise ((resolve, reject) =>{
        jeffyBuysCake([cakeType, 'Black Current'])
        .then(cake => checkIfJeffyBringsCake(cake),
        (err)=> console.log(err))
        .then(res => actionNeeded(res))
        .then(res => {
            console.log(res)
            if(res === "No action needed")
                resolve(true);
            else
                reject("Promise broken");
        })
    })

 
}
  promise('Black Fores').then((res)=> {
        if(res)
            console.log("Hurray!"+ res)
        else
            console.log("Oh No!")
  },
  (err) => console.log(err))

