/**
 * BlockSphere
 * Blockchain Block Simulator
 *
 * Educational simulation of:
 * - SHA-256 hashing
 * - Nonce
 * - Simplified proof-of-work
 * - Previous hash linking
 * - Chain validation
 */


const DIFFICULTY_PREFIX = "00";


/* =========================================================
   BLOCK 1 ELEMENTS
   ========================================================= */

const block1Data =
    document.getElementById("block-1-data");

const block1Previous =
    document.getElementById("block-1-previous");

const block1Nonce =
    document.getElementById("block-1-nonce");

const block1Hash =
    document.getElementById("block-1-hash");

const block1Card =
    document.getElementById("block-1-card");

const block1Status =
    document.getElementById("block-1-status");

const mineBlock1Button =
    document.getElementById("mine-block-1");


/* =========================================================
   BLOCK 2 ELEMENTS
   ========================================================= */

const block2Data =
    document.getElementById("block-2-data");

const block2Previous =
    document.getElementById("block-2-previous");

const block2Nonce =
    document.getElementById("block-2-nonce");

const block2Hash =
    document.getElementById("block-2-hash");

const block2Card =
    document.getElementById("block-2-card");

const block2Status =
    document.getElementById("block-2-status");

const mineBlock2Button =
    document.getElementById("mine-block-2");


/* =========================================================
   GLOBAL STATUS
   ========================================================= */

const chainStatus =
    document.getElementById("chain-status");

const chainStatusTitle =
    document.getElementById("chain-status-title");

const chainStatusDescription =
    document.getElementById(
        "chain-status-description"
    );


/* =========================================================
   SHA-256
   ========================================================= */

/**
 * Convert a string into a SHA-256 hexadecimal hash.
 */
async function sha256(message) {

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(message);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );


    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );


    return hashArray
        .map(
            byte =>
                byte
                    .toString(16)
                    .padStart(2, "0")
        )
        .join("");

}


/* =========================================================
   BLOCK HASH
   ========================================================= */

/**
 * Generate a hash from block information.
 */
async function calculateBlockHash(
    data,
    previousHash,
    nonce
) {

    const input =
        `${data}|${previousHash}|${nonce}`;

    return await sha256(input);

}


/* =========================================================
   VALIDATION
   ========================================================= */

/**
 * Check whether a hash satisfies our
 * simplified proof-of-work condition.
 */
function hasValidProof(hash) {

    return hash.startsWith(
        DIFFICULTY_PREFIX
    );

}


/**
 * Update a block's visual status.
 */
function setBlockStatus(
    card,
    statusElement,
    isValid,
    text
) {

    card.classList.remove(
        "valid",
        "invalid"
    );

    statusElement.classList.remove(
        "valid",
        "invalid"
    );


    if (isValid) {

        card.classList.add("valid");

        statusElement.classList.add(
            "valid"
        );

    } else {

        card.classList.add("invalid");

        statusElement.classList.add(
            "invalid"
        );

    }


    statusElement.textContent =
        text;

}


/* =========================================================
   CHAIN STATUS
   ========================================================= */

function updateChainStatus() {

    const hash1 =
        block1Hash.textContent;

    const hash2 =
        block2Hash.textContent;


    const block1Mined =
        hash1 !== "Not mined yet";


    const block2Mined =
        hash2 !== "Not mined yet";


    const block1Valid =
        block1Mined &&
        hasValidProof(hash1);


    const block2Valid =
        block2Mined &&
        hasValidProof(hash2) &&
        block2Previous.value === hash1;


    if (block1Valid && block2Valid) {

        chainStatus.className =
            "block-status valid";

        chainStatus.textContent =
            "Valid Chain";

        chainStatusTitle.textContent =
            "Blockchain is valid";

        chainStatusDescription.textContent =
            "Block 1 and Block 2 are correctly linked.";

        return;

    }


    if (block1Mined && block2Mined) {

        chainStatus.className =
            "block-status invalid";

        chainStatus.textContent =
            "Chain Broken";

        chainStatusTitle.textContent =
            "Blockchain is invalid";

        chainStatusDescription.textContent =
            "The block hashes or previous-hash relationship no longer match.";

        return;

    }


    if (block1Mined) {

        chainStatus.className =
            "block-status";

        chainStatus.textContent =
            "Block 1 Ready";

        chainStatusTitle.textContent =
            "Block 1 mined";

        chainStatusDescription.textContent =
            "Block 2 can now use Block 1's hash.";

        return;

    }


    chainStatus.className =
        "block-status";

    chainStatus.textContent =
        "Waiting";

    chainStatusTitle.textContent =
        "Blockchain Status";

    chainStatusDescription.textContent =
        "Mine both blocks to create a valid chain.";

}


/* =========================================================
   VALIDATE BLOCK 1
   ========================================================= */

function validateBlock1() {

    const hash =
        block1Hash.textContent;


    if (
        hash === "Not mined yet"
    ) {

        setBlockStatus(
            block1Card,
            block1Status,
            false,
            "Not Mined"
        );

        updateChainStatus();

        return;

    }


    if (
        hasValidProof(hash)
    ) {

        setBlockStatus(
            block1Card,
            block1Status,
            true,
            "Valid"
        );

    } else {

        setBlockStatus(
            block1Card,
            block1Status,
            false,
            "Invalid"
        );

    }


    updateChainStatus();

}


/* =========================================================
   VALIDATE BLOCK 2
   ========================================================= */

function validateBlock2() {

    const hash =
        block2Hash.textContent;


    if (
        hash === "Not mined yet"
    ) {

        setBlockStatus(
            block2Card,
            block2Status,
            false,
            "Waiting"
        );

        updateChainStatus();

        return;

    }


    const proofValid =
        hasValidProof(hash);


    const previousHashValid =
        block2Previous.value ===
        block1Hash.textContent;


    if (
        proofValid &&
        previousHashValid
    ) {

        setBlockStatus(
            block2Card,
            block2Status,
            true,
            "Valid"
        );

    } else {

        setBlockStatus(
            block2Card,
            block2Status,
            false,
            "Invalid"
        );

    }


    updateChainStatus();

}


/* =========================================================
   MINE BLOCK 1
   ========================================================= */

async function mineBlock1() {

    mineBlock1Button.disabled =
        true;

    mineBlock1Button.textContent =
        "Mining Block 1...";


    let nonce =
        Number(block1Nonce.value) || 0;


    let hash;


    do {

        hash =
            await calculateBlockHash(
                block1Data.value,
                block1Previous.value,
                nonce
            );


        nonce++;


    } while (
        !hasValidProof(hash)
    );


    const successfulNonce =
        nonce - 1;


    block1Nonce.value =
        successfulNonce;


    block1Hash.textContent =
        hash;

    block1Hash.classList.remove(
        "empty"
    );


    /* =====================================================
       IMPORTANT:
       Block 2 must now reference Block 1's new hash.
       ===================================================== */

    block2Previous.value =
        hash;


    /* Reset Block 2 because Block 1 changed. */

    block2Hash.textContent =
        "Not mined yet";

    block2Hash.classList.add(
        "empty"
    );


    setBlockStatus(
        block1Card,
        block1Status,
        true,
        "Valid"
    );


    setBlockStatus(
        block2Card,
        block2Status,
        false,
        "Waiting"
    );


    mineBlock2Button.disabled =
        false;


    mineBlock1Button.disabled =
        false;

    mineBlock1Button.textContent =
        "Mine Block 1";


    updateChainStatus();

}


/* =========================================================
   MINE BLOCK 2
   ========================================================= */

async function mineBlock2() {

    if (
        block1Hash.textContent ===
        "Not mined yet"
    ) {

        return;

    }


    mineBlock2Button.disabled =
        true;

    mineBlock2Button.textContent =
        "Mining Block 2...";


    let nonce =
        Number(block2Nonce.value) || 0;


    let hash;


    do {

        hash =
            await calculateBlockHash(
                block2Data.value,
                block2Previous.value,
                nonce
            );


        nonce++;


    } while (
        !hasValidProof(hash)
    );


    const successfulNonce =
        nonce - 1;


    block2Nonce.value =
        successfulNonce;


    block2Hash.textContent =
        hash;

    block2Hash.classList.remove(
        "empty"
    );


    validateBlock2();


    mineBlock2Button.disabled =
        false;

    mineBlock2Button.textContent =
        "Mine Block 2";

}


/* =========================================================
   BLOCK 1 DATA CHANGE
   ========================================================= */

function handleBlock1Change() {

    /*
     * We deliberately do NOT automatically re-mine.
     *
     * This demonstrates why changing a block's data
     * breaks its existing hash.
     */

    block1Hash.textContent =
        "Hash changed — re-mine Block 1";

    block1Hash.classList.add(
        "empty"
    );


    setBlockStatus(
        block1Card,
        block1Status,
        false,
        "Needs Re-mining"
    );


    /*
     * Block 2 still contains the old Block 1 hash.
     * Therefore its chain relationship is broken.
     */

    setBlockStatus(
        block2Card,
        block2Status,
        false,
        "Invalid"
    );


    chainStatus.className =
        "block-status invalid";

    chainStatus.textContent =
        "Chain Broken";

    chainStatusTitle.textContent =
        "Blockchain is invalid";

    chainStatusDescription.textContent =
        "Block 1 changed, so Block 2 no longer has a valid previous hash.";

}


/* =========================================================
   OTHER INPUT CHANGES
   ========================================================= */

function handleBlock2Change() {

    if (
        block2Hash.textContent !==
        "Not mined yet"
    ) {

        block2Hash.textContent =
            "Data changed — re-mine Block 2";

        block2Hash.classList.add(
            "empty"
        );

    }


    setBlockStatus(
        block2Card,
        block2Status,
        false,
        "Needs Re-mining"
    );


    updateChainStatus();

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

mineBlock1Button.addEventListener(
    "click",
    mineBlock1
);


mineBlock2Button.addEventListener(
    "click",
    mineBlock2
);


block1Data.addEventListener(
    "input",
    handleBlock1Change
);


block1Previous.addEventListener(
    "input",
    handleBlock1Change
);


block2Data.addEventListener(
    "input",
    handleBlock2Change
);


/* =========================================================
   INITIAL STATE
   ========================================================= */

updateChainStatus();