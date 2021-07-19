import React from 'react'

export default function Treasury() {
  return (
    <div>
      <div
        style={{
          maxWidth: 540,
          padding: 20,
          lineHeight: 1.3,
          paddingBottom: 100,
          margin: '10vh auto',
        }}
      >
        <section>
          <h1>TileDAO treasury</h1>

          <p>
            This is a guide to how the TileDAO treasury works. Every part of the
            configuration will ultimately be managed by the DAO, and can be
            voted on by TILE holders.
          </p>
          <p>This isn't quite complete and will continue to be updated!</p>
          <p>
            Link to treasury:{' '}
            <a
              href="https://juicebox.money/#/p/tiles"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://juicebox.money/#/p/tiles
            </a>
          </p>
        </section>
        <section>
          <h2>Funding target</h2>
          <img
            style={{ maxWidth: '100%' }}
            src="assets/screenshots/funding_target.png"
          />
          <p>
            The treasury funding target is the amount of funds allocated to be
            spent by the treasury. Any extra revenue earned by the treasury in a
            single 7-day funding cycle becomes overflow. When the next funding
            cycle starts, overflow will remain in the treasury, but will be put
            towards the funding target of the next cycle.
          </p>
          <p>
            To start with, the target is set to 5.05 ETH, and there's over 66
            ETH in overflow. Of the 5.05 ETH, 60% is allocated to{' '}
            <a
              href="https://twitter.com/peripheralist"
              target="_blank"
              rel="noopener noreferrer"
            >
              @peripheralist
            </a>
            , and 40% to the{' '}
            <a
              href="https://juicebox.money/#/p/juicebox"
              target="_blank"
              rel="noopener noreferrer"
            >
              JuiceboxDAO
            </a>
            .
          </p>
          <p>
            A portion of the treasury's overflow can be claimed by anyone who
            holds TILE ERC-20 tokens, by burning TILE in exchange for ETH.
          </p>
        </section>
        <section>
          <h2>TILE</h2>
          <img
            style={{ maxWidth: '100%' }}
            src="assets/screenshots/tokens.png"
          />
          <p>
            TILE are ERC-20 tokens earned by paying the TileDAO treasury. Buying
            Tiles here earns you TILE, because revenue from all sales are sent
            to the treasury. Buying a TILE on the secondary market won't earn
            you TILE.
          </p>
          <p>
            When TILE is earned, it starts out "staked", meaning although your
            balance is tracked by the treasury, the ERC-20 tokens aren't
            actually in your wallet. There isn't any reason to have your TILE
            staked—this just prevents you from needing to pay extra gas to
            transfer ERC-20 tokens on every Tile purchase. You can still redeem
            TILE for overflow from the treasury whether they're staked or not.
          </p>
          <h4>Reserves</h4>
          <p>
            Reserved tokens are a portion of all payments made to the DAO.
            "Minting" them sends them to the wallets they've been reserved for.
            Minting is a separate step to allow all reserved tokens to be moved
            at once—instead of every time a payment is made—making gas costs
            cheaper when paying the treasury.
          </p>
          <p>
            Currently, 10% of tokens are reserved for{' '}
            <a
              href="https://twitter.com/peripheralist"
              target="_blank"
              rel="noopener noreferrer"
            >
              @peripheralist
            </a>
            .
          </p>
        </section>
        <section>
          <h2>Bonding curve</h2>
          <p>
            Note: This refers to the treasury bonding curve—not the Tiles
            pricing tiers.
          </p>
          <p>
            When redeeming TILE ERC-20 tokens for overflow in the DAO treasury,
            the ratio of ETH that can be claimed per TILE is affected by the
            bonding curve, measured on a scale of 0-100%.
          </p>
          <p>
            A lower bonding curve creates incentive for TILE holders not to
            redeem their tokens for overflow from the treasury, as the first
            ones to do so will get a very poor deal. A 100% bonding curve means
            the ratio of ETH earned per TILE burnt will always be the same for
            everyone, regardless of when/if they exchange their TILE for
            overflow.
          </p>
          <p>Currently the bonding curve is set in the middle at 50%.</p>
        </section>
        <section>
          <h2>Discount rate</h2>
          <p>
            When paying the TileDAO treasury—either directly, or by buying a
            Tile in the primary sale—TILE ERC-20 tokens are rewarded
            proportional to how much ETH was paid.
          </p>
          <p>
            The discount rate allows for decreasing the amount of TILE tokens
            rewarded per ETH paid over time. A discount rate of 0% means the
            ratio will always remain the same. A higher discount rate % will
            cause the ratio to decrease by that percentage each time a new
            funding cycle starts.
          </p>
        </section>
        <section>
          <h2>What's a funding cycle?</h2>
          <p>
            The treasury operates in 7 day funding cycles. The treasury
            configuration can only change for the upcoming funding cycle,
            allowing settings to be locked in for a period of time.
          </p>
        </section>
      </div>
    </div>
  )
}
