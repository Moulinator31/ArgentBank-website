function BankAccountCard({ tittle, amount, description }) {
    return <section className="account">

        <h2 className="sr-only">Accounts</h2>

        <div className="account-content-wrapper">
            <h3 className="account-title">{tittle}</h3>
            <p className="account-amount">{amount}</p>
            <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
        </div>

    </section>
}
export default BankAccountCard;