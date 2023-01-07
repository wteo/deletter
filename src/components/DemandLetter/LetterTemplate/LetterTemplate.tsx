import React, { useState } from 'react';
import { useDb } from 'src/contexts/DbContext';

import CustomerAddress from './CustomerAddress/CustomerAddress';
import TodayDate from './TodayDate';
import MainContent from './MainContent/MainContent';
import Signature from './Signature/Signature';

import style from './LetterTemplate.module.scss';

// Typing 
import { billingAddress } from '../../../types/BillingAddress';
import { signature } from '../../../types/Signature';
import { invoice } from 'src/types/Invoice';

function LetterTemplate() {

    // Templates
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

    const templateSignature: signature = {
        signedName      : '[Your name]',
        signedPosition  : '[Your Position]',
        company         : '[Your Company]',
        phone           : '[Phone]',
        email           : '[Email]',
    }

    // Importing data from database
    const { billingAddresses, invoices } = useDb();

    // Handling customer selection
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

    // Handling signature selection
    // const [selectedSignature, setSelectedSignature] = useState<string>('');

    return (
        <div id={style.letterTemplate}>
            <label>Pick which customer you want to send your Demand Letter to.</label>
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
            <MainContent recipient={billedTo} invoices={filteredInvoices} />
            <Signature 
                signedName={templateSignature.signedName}
                signedPosition={templateSignature.signedPosition}
                company={templateSignature.company}
                phone={templateSignature.phone}
                email={templateSignature.email}
            />
        </div> 
    );
}

export default LetterTemplate;