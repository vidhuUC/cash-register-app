import React from 'react'

type GetChangeProps = {
    denominations: {
        type: string;
        value: number;
        count: number;
        valueDenomination: number;
    }[];
    setDenominations: React.Dispatch<React.SetStateAction<{
        type: string;
        value: number;
        count: number;
        valueDenomination: number;
    }[]>>;
    setResult: React.Dispatch<React.SetStateAction<{
        success: boolean;
        message: string;
    }>>;
}

const GetChange = ({ denominations, setDenominations, setResult }: GetChangeProps) => {


    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const amount = (e.target as HTMLFormElement).amount.value;
        let Amount = parseInt(amount);
        let changeDenomination = [] as { type: string; count: number; }[]
        const updatedDenominations = denominations.map(denomination => {
            let count = 0;
            let denominationCount = denomination.count;
            const denominationValue = denomination.valueDenomination;

            while (Amount >= denominationValue && denominationCount > 0) {
                Amount -= denominationValue;
                denominationCount--;
                count++;
            }

            if (count > 0) {
                changeDenomination.push({ type: denomination.type, count: count });
                return { ...denomination, count: denominationCount, value: denominationCount * denominationValue };
            }
            return denomination;
        }) as {
            type: string;
            value: number;
            count: number;
            valueDenomination: number;
        }[]

        if (Amount > 0) {
            setResult({ success: false, message: `Cannot make change for ${amount}` });
        }
        else {
            setDenominations(updatedDenominations);
            const message = changeDenomination.map(denomination => `${denomination.count} ${denomination.type}`).join(", ");
            setResult({ success: true, message: `Successfully got change for ${amount} with ${message}` });
        }
        e.currentTarget.reset();

    }

    return (
        <div className="row">
            <div className="col-sm-12">
                <form onSubmit={e => handleChange(e)}>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" className="form-control" id="amount" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>

    )
}

export default GetChange
