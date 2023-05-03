class APIFeature {
    constructor(query,querystr){
        this.query = query,
        this.querystr = querystr
    }

    search(){
        let keyword = this.querystr.keyword ? {
            name:{
                $regex:this.querystr.keyword,
                $options:'i'
            }
        }:{}
        this.query.find({...keyword})
        return this;
    }

    filter(){
        const querStrCopy ={...this.querystr}

        ///removing feilds from query
        const removeFields=['keyword','limit','page'];
        removeFields.forEach(field => delete querStrCopy[field]);
        let queryStr = JSON.stringify(queryStrCopy)
        this.query.find(querStrCopy);
       queryStr= queryStr.replace(/\b(gt|gte|lt|lte)/g,match =>`$${match}`)
       console.log(queryStr)
        console.log(queryStrCopy);
        return this
    }
}

module.exports =APIFeature;