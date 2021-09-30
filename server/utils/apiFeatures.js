class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filter() {
        //filtering
        const queryObj = { ...this.queryStr };
        const toDelete = ['sort', 'page', 'limit', 'fields'];
        toDelete.forEach(el => delete queryObj[el]);

        //advanced filtering
        const queryString = JSON.stringify(queryObj).replace(
            /\b(gt|gte|lt|lte)/g,
            match => `$${match}`
        );
        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    sort() {
        //sorting
        this.query = this.queryStr.sort
            ? this.query.sort(this.queryStr.sort.split(',').join(' '))
            : this.query.sort('-createdAt');
        return this;
    }

    showFields() {
        //show specific fielsd
        this.query = this.queryStr.fields
            ? this.query.select(this.queryStr.fields.split(',').join(' '))
            : this.query.select('-__v');
        return this;
    }

    paginate() {
        //pagination
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
module.exports = APIFeatures;
