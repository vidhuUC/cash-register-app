import React from 'react'

type DenominationCardProps = {
    denomination: {
        type: string;
        value: number;
        count: number;
        valueDenomination: number;
    };
    setDenominations: React.Dispatch<React.SetStateAction<{
        type: string;
        value: number;
        count: number;
        valueDenomination: number;
    }[]>>;
}


const DenominationCard = ({ denomination, setDenominations }: DenominationCardProps) => {
    const imageUrl = `${process.env.PUBLIC_URL}/denomination_images/${denomination.type.toLowerCase()}.jpg`

    const addDenomination = () => {
        setDenominations(prevState => {
            return prevState.map(d=> {
                if(d.type === denomination.type) {
                    return {...d,count: d.count + 1, value: d.value + d.valueDenomination}
                }
                return d;
            })
        })


    }

    const subtractDenomination = () => {
        setDenominations(prevState => {
            return prevState.map(d=> {
                if(d.type === denomination.type) {
                    return {...d,count: d.count - 1, value: d.value - d.valueDenomination}
                }
                return d;
            })
        })
    }

    return (
        <div className="col-sm-3">
            <div className="card shadow-sm mb-4">
                <img src={imageUrl} className="card-img-top" alt={denomination.type} />
                <div className="card-body">
                    <button className="btn btn-sm btn-dark position-absolute" style={{ top: 0, right: 0 }} onClick={addDenomination}>+</button>
                    <button className="btn btn-sm btn-dark position-absolute" style={{ top: 0, left: 0 }} onClick={subtractDenomination}>-</button>
                    <div className="card-text">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="h6">Count</div>
                                <div className="h4">{denomination.count}</div>
                            </div>
                            <div className="col-sm-6">
                                <div className="h6">Value</div>
                                <div className="h4">${denomination.value}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DenominationCard
