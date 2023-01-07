import React, { useState } from 'react';
import { useDb } from 'src/contexts/DbContext';

import CustomerAddress from './CustomerAddress/CustomerAddress';
import TodayDate from './TodayDate';
import MainContent from './MainContent/MainContent';
import Signature from './Signature';

import style from './LetterTemplate.module.scss';

// Typing 
import { billingAddress } from '../../../types/BillingAddress';
import { invoice } from 'src/types/Invoice';

function LetterTemplate() {

    const templateCustomerAddress: billingAddress = {
        billedTo    : '[Billed To]',
        position    : '[Position]',
        company     : '[Company Name]',
        building    : '[Building]', 
        street      : '[Street]',
        surburb     : '[Surburb]',
        postcode    : '[Postcode]',
        state       : '[State]',
        country     : '[Country]',
    }

    const { billingAddresses, invoices } = useDb();
    const [selectedCompany, setSelectedCompany] = useState<string>('');

    // sorting the customer names a.k.a companies
    const companies: string[] = billingAddresses.map((billingAddress: billingAddress) => billingAddress.company);
    const sortedCompanies: string[] = companies.sort();

    // Generating billing address in letter template as per selected by user 
    const selectedCompanyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedCompany(event.target.value);
    const filterBillingAddresses: billingAddress[] = billingAddresses.filter((billingAddress: billingAddress) => billingAddress.company === selectedCompany);
    const selectedBillingAddress: billingAddress = filterBillingAddresses[0];
    const { billedTo, position, company, building, street, surburb, postcode, state, country }: billingAddress = selectedBillingAddress ?? templateCustomerAddress;

    // Filtering invoices as per selected customer
    const filteredInvoices = invoices.filter((invoice: invoice) => invoice.customerName === selectedCompany);

    return (
        <div id={style.letterTemplate}>
            <label>Which customer you want to send your Demand Letter to?</label>
            <br/>
            <select name="selectedBillingAddress" value={selectedCompany} onChange={selectedCompanyHandler}>
                <option value='' ></option>
                { sortedCompanies.map((company: string) => <option key={company} value={company}>{company}</option>)}
            </select>
            <CustomerAddress 
                billedTo={billedTo} 
                position={position} 
                company={company} 
                building={building} 
                street={street} 
                surburb={surburb} 
                state={state} 
                postcode={postcode} 
                country={country}
            />
            <TodayDate />
            <h2>Re: Demand for Payment of Overdue Invoices</h2>
            <MainContent recipient={billedTo} invoices={filteredInvoices} />
            <Signature />
        </div> 
    );
}

export default LetterTemplate;