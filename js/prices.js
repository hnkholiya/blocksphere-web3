/**
 * Live Cryptocurrency Prices
 * 
 * Fetches Bitcoin and Ethereum data
 * from the CoinGecko public API.
 */


const API_URL =
    "https://api.coingecko.com/api/v3/simple/price" +
    "?ids=ethereum,bitcoin" +
    "&vs_currencies=usd" +
    "&include_24hr_change=true";


const bitcoinPrice =
    document.getElementById("bitcoin-price");

const ethereumPrice =
    document.getElementById("ethereum-price");

const bitcoinChange =
    document.getElementById("bitcoin-change");

const ethereumChange =
    document.getElementById("ethereum-change");

const refreshButton =
    document.getElementById("refresh-prices");

const refreshText =
    document.getElementById("refresh-text");

const refreshIcon =
    document.getElementById("refresh-icon");

const marketStatus =
    document.getElementById("market-status-text");

const apiError =
    document.getElementById("api-error");


/**
 * Format USD price
 */
function formatUSD(value) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }
    ).format(value);

}


/**
 * Format percentage
 */
function formatPercentage(value) {

    const sign =
        value >= 0 ? "+" : "";

    return `${sign}${value.toFixed(2)}%`;

}


/**
 * Update price change element
 */
function updateChangeElement(
    element,
    change
) {

    const isPositive =
        change >= 0;


    element.className =
        "price-change " +
        (isPositive
            ? "positive"
            : "negative");


    element.innerHTML = `

        <span class="change-arrow">
            ${isPositive ? "↑" : "↓"}
        </span>

        <span>
            ${formatPercentage(change)}
        </span>

    `;

}


/**
 * Set loading state
 */
function setLoadingState(isLoading) {

    refreshButton.disabled =
        isLoading;


    if (isLoading) {

        refreshIcon.innerHTML = "↻";

        refreshText.textContent =
            "Loading Prices...";

        marketStatus.textContent =
            "Updating market data";

    } else {

        refreshIcon.innerHTML = "↻";

        refreshText.textContent =
            "Refresh Prices";

    }

}


/**
 * Show API error
 */
function showError(message) {

    apiError.textContent =
        message;

    apiError.classList.add(
        "visible"
    );

    marketStatus.textContent =
        "Unable to load data";

}


/**
 * Hide API error
 */
function hideError() {

    apiError.textContent = "";

    apiError.classList.remove(
        "visible"
    );

}


/**
 * Fetch live cryptocurrency prices
 */
async function fetchPrices() {

    setLoadingState(true);

    hideError();


    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                `API request failed with status ${response.status}`
            );

        }


        const data =
            await response.json();


        /* =========================
           Validate response
           ========================= */

        if (
            !data.bitcoin ||
            !data.ethereum
        ) {

            throw new Error(
                "Incomplete data received from CoinGecko."
            );

        }


        /* =========================
           Bitcoin
           ========================= */

        bitcoinPrice.textContent =
            formatUSD(
                data.bitcoin.usd
            );


        updateChangeElement(
            bitcoinChange,
            data.bitcoin.usd_24h_change
        );


        /* =========================
           Ethereum
           ========================= */

        ethereumPrice.textContent =
            formatUSD(
                data.ethereum.usd
            );


        updateChangeElement(
            ethereumChange,
            data.ethereum.usd_24h_change
        );


        /* =========================
           Success
           ========================= */

        marketStatus.textContent =
            "Live data loaded";


    } catch (error) {

        console.error(
            "CoinGecko API error:",
            error
        );


        showError(
            "We couldn't load the live prices right now. " +
            "Please try refreshing again."
        );


    } finally {

        setLoadingState(false);

    }

}


/**
 * Refresh button
 */
refreshButton.addEventListener(
    "click",
    fetchPrices
);


/**
 * Initial API request
 */
fetchPrices();