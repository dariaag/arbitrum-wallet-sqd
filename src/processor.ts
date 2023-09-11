import { lookupArchive } from "@subsquid/archive-registry";
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";

export const processor = new EvmBatchProcessor()
  .setDataSource({
    // Change the Archive endpoints for run the squid
    // against the other EVM networks
    // For a full list of supported networks and config options
    // see https://docs.subsquid.io/evm-indexing/
    archive: "https://v2.archive.subsquid.io/network/arbitrum-one-demo",
    chain: process.env.RPC_ARBITRUM_ONE_HTTP,

    // Must be set for RPC ingestion (https://docs.subsquid.io/evm-indexing/evm-processor/)
    // OR to enable contract state queries (https://docs.subsquid.io/evm-indexing/query-state/)
  })
  .setBlockRange({
    from: 4396000,
  })
  .setFinalityConfirmation(75)
  .setFields({
    transaction: {
      from: true,
      value: true,
      hash: true,
      to: true,
    },
  })

  .addTransaction({
    to: ["0xca37cad587d26f5ec69742737121e7c280c40669"],
  })
  .addTransaction({
    from: ["0xca37cad587d26f5ec69742737121e7c280c40669"],
  })

  .addTrace({
    callTo: ["0xca37cad587d26f5ec69742737121e7c280c40669"],
    type: ["call"],
    transaction: true,
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
