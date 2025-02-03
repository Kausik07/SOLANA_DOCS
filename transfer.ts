import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
  import "dotenv/config";
  import { getKeypairFromEnvironment } from "@solana-developers/helpers";
  
  const suppliedToPubkey = process.argv[2];
  
  if (!suppliedToPubkey) {
    console.error("❌ Please provide a public key to send SOL to.");
    process.exit(1);
  }
  
  (async () => {
    try {
      const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
  
      console.log(`🔹 Recipient Public Key: ${suppliedToPubkey}`);
  
      const toPubkey = new PublicKey(suppliedToPubkey);
  
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  
      console.log("✅ Loaded sender keypair and connected to Solana Devnet.");
  
      const transaction = new Transaction();
  
      const LAMPORTS_TO_SEND = 5000;
  
      const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey,
        lamports: LAMPORTS_TO_SEND,
      });
  
      transaction.add(sendSolInstruction);
  
      const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
  
      console.log(`💸 Success! Sent ${LAMPORTS_TO_SEND} lamports to ${toPubkey}.`);
      console.log(`🔗 Transaction Signature: ${signature}`);
    } catch (error) {
      console.error("❌ Transaction failed:", error.message);
    }
  })();
  