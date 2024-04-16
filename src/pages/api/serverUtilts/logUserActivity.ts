/**
 * @file This is the function for logging important events to the database.
 * @Author Torjus A.M, Thomas H
 * @param eventType - String representation of an event
 * @param accountId - ID of the logged in service-account
 * @param details - Additional details
 */

export async function logUserActivity(eventType: string, accountId?: string, details?: string) {
    console.log('logUserActivity:', eventType, accountId, details);

    await fetch('http://localhost:3000/api/auth/setLog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event_type: eventType,
            account_id: accountId,
            details: details
        }),
    }).catch(error => {
        console.error('Feil i loggføring:', error);
        throw new Error('Feil under loggføring, kontakt en administrator.');
    });
}