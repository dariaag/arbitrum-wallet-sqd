module.exports = class Data1694422634892 {
    name = 'Data1694422634892'

    async up(db) {
        await db.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "block" integer NOT NULL, "address" text NOT NULL, "to" text NOT NULL, "value" numeric NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_566a94b576a5321a427a7b1743" ON "transaction" ("address") `)
        await db.query(`CREATE INDEX "IDX_1713783ebe978fa2ae9654e4bb" ON "transaction" ("to") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "transaction"`)
        await db.query(`DROP INDEX "public"."IDX_566a94b576a5321a427a7b1743"`)
        await db.query(`DROP INDEX "public"."IDX_1713783ebe978fa2ae9654e4bb"`)
    }
}
