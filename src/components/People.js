import React, {useState} from 'react';
import {usePaginatedQuery} from 'react-query';
import Person from './Person';

const fetchPeople = async (key, page) => {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    return res.json();
}

const People = () => {
    const [page, setPage] = useState(1);
    const {resolvedData, latestData, status} = usePaginatedQuery(['people', page], fetchPeople);
    return ( 
        <div>
            <h2>People</h2>
            {status === 'loading' && (
                <div>Loading data</div>
            )}
            {status === 'error' && (
                <div>Error fetching data</div>
            )}
            {status === 'success' && (
                <>
                    <button onClick={() => setPage(curr => Math.max(curr - 1, 1))}
                        disabled={page ===1}
                    >Previous Page</button>
                    <span>{page}</span>
                    <button onClick={() => setPage(curr => (latestData.next ? curr + 1: curr))}
                        disabled={(!latestData || !latestData.next)}
                    >Next Page</button>
                    <div>
                        {resolvedData.results.map(person => 
                            <Person key={person.name} person={person}/>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
 
export default People;