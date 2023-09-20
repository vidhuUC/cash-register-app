import React, { useMemo } from 'react'
import RegisterTotal from './RegisterTotal';

type Denomination = {
    denominations: {
        type: string;
        value: number;
        count: number;
        valueDenomination: number;
    }[];
}

const BalanceSheet = ({ denominations }: Denomination) => {

    const calculateTotal = useMemo(() => {
        const total = denominations.reduce((total, denomination) => {
            return total + denomination.value;
        }, 0)
        return total;
    }, [denominations]);




    return (
        <div className="col-md-8 position-relative mt-5 floating-label-panel balance-sheet">
            <div className="border border-light shadow-sm rounded p-4 pt-5">
                <div className="position-absolute h2 bg-dark text-light px-2 mb-0">Register Balance</div>
                <div className="row">
                    <RegisterTotal total={calculateTotal} />
                    <div className="col-sm-6">
                        <table className="table table-sm mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Denomination</th>
                                    <th scope="col">Count</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {denominations.map((denomination, index) => (
                                    <tr key={index}>
                                        <td>{denomination.type}</td>
                                        <td>{denomination.count}</td>
                                        <td>${denomination.value}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BalanceSheet
