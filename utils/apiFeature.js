class APIFeature {
    constructor(query,querystr){
        this.query = query,
        this.querystr = querystr
    }

    search(){
        let keyword = this.querystr.keyword ?{
            name:{
                $regex:this.querystr.keyword,
                $options:'i'
            }
        }:{}
        this.query.find({...keyword})
        return this;
    }
}

module.exports =APIFeature;