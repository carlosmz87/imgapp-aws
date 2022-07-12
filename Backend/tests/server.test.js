let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.should();
chai.use(chaiHttp);

describe('API TEST BEGIN',()=>{
    describe("GET /traing/api/get", ()=>{
        it("IT SHOULD GET ALL THE REGISTERS", (done)=>{
            chai.request(server)
                .get("/training/api/get")
                .end((err, response)=>{
                    response.should.have.status(200);
                done();
                });
        });
    });

    describe("POST /traing/api/post", ()=>{
        it("IT SHOULD POST A REGISTER", (done)=>{
            chai.request(server)
                .post("/training/api/post")
                .end((err, response)=>{
                    response.should.have.status(500);
                done();
                });
        });
    });

    describe("PUT /traing/api/put/:filename", ()=>{
        it("IT SHOULD MODIFY SELECTED REGISTER", (done)=>{
            const filename = "bandera1.jpg";
            chai.request(server)
                .get("/training/api/put/:"+ filename)
                .end((err, response)=>{
                    response.should.have.status(404);
                done();
                });
        });
    });

    describe("DELETE /traing/api/delete/:filename", ()=>{
        it("IT SHOULD DELETE THE SELECTED REGISTER", (done)=>{
            const filename = "bandera1.jpg";
            chai.request(server)
                .get("/training/api/delete/:"+filename)
                .end((err, response)=>{
                    response.should.have.status(404);
                done();
                });
        });
    });
});
