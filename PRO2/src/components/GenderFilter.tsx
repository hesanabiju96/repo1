import React, { useState } from 'react';

interface GenderFilterProps {
    onFilter: (value: string) => void; // <== This tells TypeScript it's a function!
}

const GenderFilter: React.FC<GenderFilterProps> = ({ onFilter }) => {
    const [value, setValue] = useState('');

    return (
        <select
            style={{ margin: '0rem 0', height: '38px', width: '40%' }}
            value={value}
            onChange={(e) => {
                const selectedValue = e.target.value;
                setValue(selectedValue);
                onFilter(e.target.value); // <== Using your function here
            }}
        >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
    );
};

export default GenderFilter;
