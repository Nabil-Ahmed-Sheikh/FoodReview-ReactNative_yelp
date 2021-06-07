import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

function SearchScreen({  }) {

    const [searchTerm , setSearchTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = (price) => {
        // price === '$' || '$$' || '$$$'
        return results.filter(result => {
            return result.price === price;
        });
    }

    return (
        <>
            <SearchBar 
                searchTerm={searchTerm} 
                onSearchTermChange={setSearchTerm}
                onSearchTermSubmit={() => {searchApi(searchTerm)}}
            />
            {errorMessage ? <Text>{errorMessage}</Text>: null}
            <ScrollView>
                
                
                
                <ResultsList 
                title="Cost Effective" 
                results={filterResultsByPrice('$')}
                />
                <ResultsList 
                title="Bit Pricier" 
                results={filterResultsByPrice('$$')}
                />
                <ResultsList 
                title="Big Spender" 
                results={filterResultsByPrice('$$$')}
                />
                
            </ScrollView>
            
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default SearchScreen;