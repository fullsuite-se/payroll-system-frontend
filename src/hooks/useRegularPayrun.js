import { useEffect, useState } from "react";
import { usePayitemContext } from "../contexts/PayitemProvider";

const formData = {
    date_from: '',
    date_to: '',
    payment_date: '',
    pay_items: [
        { 'pay-item-01': "Tax Withheld" },
        { 'pay-item-02': "Basic Pay" },
    ], //payitem_id : pay_item_name in the column
}

const useRegularPayrun = () => {
    const [options, setOptions] = useState({ ...formData });
    const { payitems } = usePayitemContext();

    useEffect(() => {
        console.log("running regular payrun hook");
    }, []);

    // Handle input changes
    const handleInputChange = (field, value) => {
        setOptions(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle payitem selection
    const handlePayitemChange = (payitemId) => {
        const selectedPayitem = payitems.find(item => item.payitem_id === payitemId);
        if (selectedPayitem) {
            const newPayItem = {
                [payitemId]: selectedPayitem.payitem_name
            };

            // Check if payitem already exists in the array
            const existingIndex = options.pay_items.findIndex(item =>
                Object.keys(item)[0] === payitemId
            );

            if (existingIndex === -1) {
                // Add new payitem
                setOptions(prev => ({
                    ...prev,
                    pay_items: [...prev.pay_items, newPayItem]
                }));
            }
        }
    };

    // Remove payitem from selection
    const removePayitem = (payitemId) => {
        setOptions(prev => ({
            ...prev,
            pay_items: prev.pay_items.filter(item =>
                Object.keys(item)[0] !== payitemId
            )
        }));
    };



    return {
        options, setOptions,
        //options controll
        handleInputChange, handlePayitemChange, removePayitem,
    };
};

export default useRegularPayrun;