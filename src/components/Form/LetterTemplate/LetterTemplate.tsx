import React, { useState } from 'react';
import { useDb } from 'src/contexts/DbContext';

import CustomerAddress from './CustomerAddress/CustomerAddress';
import TodayDate from './TodayDate';
import MainContent from './MainContent/MainContent';
import Signature from './Signature/Signature';

import styles from './LetterTemplate.module.scss';

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
        signedCompany   : '[Your Company]',
        phone           : '[Phone]',
        email           : '[Email]',
    }

    // Importing data from database
    const { billingAddresses, invoices, signatures } = useDb();

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
    const [selectedName, setSelectedName] = useState<string>('');
    const selectedNameHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedName(event.target.value);
    const filterNames: signature[] = signatures.filter((signature: signature) => `${signature.signedName} of ${signature.signedCompany}`=== selectedName);
    const selectedSignature: signature = filterNames[0];
    const { signedName, signedPosition, signedCompany, phone, email }: signature = selectedSignature ?? templateSignature;

    // sorting the signatures by name, followed by company
    const names: string[] = signatures.map((signature: signature) => [`${signature.signedName} of ${signature.signedCompany}`]);
    const sortedNames: string[] = names.sort();

    // Sending out letter as the final step
    const [isLetterChecked, setIsLetterSent] = useState<boolean>(false);

    const sentHandler = () => {
        if (selectedCompany === '') {
            alert('Please select a customer.');
            return;
        }
        if (selectedName === '') {
            alert('Please pick your signature.');
            return;
        }
        if (isLetterChecked) {
            setSelectedCompany('');
            setSelectedName('');
        };
        setIsLetterSent(isLetterChecked => !isLetterChecked);
    }


    return (
        <div id={styles.letterTemplate}>
            { isLetterChecked === false &&
            <>
            <label>Pick which customer you want to send your Demand Letter to.</label>
            <br/>
            <select name="selectedBillingAddress" value={selectedCompany} onChange={selectedCompanyHandler}>
                <option value='' ></option>
                { sortedCompanies.map((company: string) => <option key={company} value={company}>{company}</option>)}
            </select>
            </>}
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
            { isLetterChecked === false &&
            <>
            <label>Pick your signature.</label>
            <br/>
            <select name="selectedSignature" value={selectedName} onChange={selectedNameHandler}>
                <option value='' ></option>
                { sortedNames.map((name: string) => <option key={name} value={name}>{name}</option>)}
            </select>
            </>}
            <Signature 
                signedName={signedName}
                signedPosition={signedPosition}
                signedCompany={signedCompany}
                phone={phone}
                email={email}
            />
            <button id={styles.letterButton} onClick={sentHandler}>{ isLetterChecked ? 'Reset' : 'Finalise'}</button>
        </div>
    );
}

export default LetterTemplate;