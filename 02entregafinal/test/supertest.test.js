import supertest from "supertest";
import { expect } from "chai";
const requester = supertest("http://localhost:3001");

describe("Testing de la App Web Adoptame", () => {
    describe("Testing de Adopciones", () => {
        it("Endpoint GET /api/adoptions debe traer todas las mascotas", async () => {

            const { status, _body } = await requester.get("/api/adoptions")

            expect(status).to.equal(200);
            expect(_body.payload).to.be.an("array");
        })

        it("Debe retornar 404 si la ruta no existe", async () => {
            const {status} = await requester.get("/api/adoption/noexiste")

            expect(status).to.equal(404); 
        })

        //chequear test
        it("Traemos una adopcion por ID", async () => {
            let idAdoption = "67bd2b9b2f2d609e311a805d"; 

            const {status, _body} = await requester.get(`/api/adoptions/${idAdoption}`); 
            expect(status).to.equal(200); 
            expect(_body.payload).to.have.property("_id").that.equals(idAdoption); 
        })

        //chequear test
        it("Creamos una adopcion", async () => {
            let uid = "67bb411f02ebe0222382abf3"; 
            let pid = "67bd282e2f2d609e311a8050"; 

            const {status} = await requester.post(`/api/adoptions/${uid}/${pid}`);
            console.log(status); 
            expect(status).to.equal(200); 
        })
    })
})