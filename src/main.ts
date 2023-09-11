import { TypeormDatabase } from "@subsquid/typeorm-store";
import { Transaction } from "./model";
import { processor } from "./processor";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const transactions: Map<string, Transaction> = new Map();
  for (let c of ctx.blocks) {
    for (let tx of c.transactions) {
      transactions.set(
        tx.hash,
        new Transaction({
          id: tx.hash,
          block: c.header.height,
          address: tx.from,
          to: tx.to,
          value: tx.value,
          txHash: tx.hash,
        })
      );
    }
    if (c.header.height <= 4628179) {
      for (let tr of c.traces) {
        const tx = tr.transaction;
        if (!tx) continue;

        console.log(tx);
        transactions.set(
          tx.hash,
          new Transaction({
            id: tx.hash,
            block: c.header.height,
            address: tx.from,
            to: tx.to,
            value: tx.value,
            txHash: tx.hash,
          })
        );
      }
    }
  }

  // upsert batches of entities with batch-optimized ctx.store.save
  await ctx.store.upsert([...transactions.values()]);
});
