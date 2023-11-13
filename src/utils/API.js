import { getFunctions, httpsCallable } from 'firebase/functions';
import { 
    getDatabase, 
    ref, 
    onValue, 
    get, 
    set, 
    push, 
    query, 
    orderByChild, 
    equalTo, 
    serverTimestamp,
} from "firebase/database";

export const generateId = (path) => {
    return push(ref(getDatabase(), path)).key;
}

export const listenDbQuery = (path, id, value, onChange) => {
    return onValue(query(ref(getDatabase(), path), orderByChild(id), equalTo(value)), (snapshot) => {
        const data = snapshot.val();

        onChange(data);
    })
}

export const listenDb = (path, onChange) => {
    return onValue(ref(getDatabase(), path), (snapshot) => {
        const data = snapshot.val();

        onChange(data);
    })
}

export const getReadDb = (path) => {
    return get(ref(getDatabase(), path));
}

export const readDb = (path, onChange, onFailure) => {
    get(ref(getDatabase(), path))
    .then((snapshot) => {
        const data = snapshot.val();

        onChange(data);
    })
    .catch((error) => {
        if (onFailure) {
            onFailure(error);
        }
    });
}

export const writeDb = (path, data, finished) => {
    set(ref(getDatabase(), path), data)
    .then(() => {
        if (finished) {
            finished(null);
        }
    })
    .catch((error) => {
        if (finished) {
            console.log("Write Failed:", error)
            finished(error);
        }
    });
}

export const invokeHttpsApi = (functionName, params, success, failure) => {
    const functions = getFunctions();
    const func = httpsCallable(functions, functionName);
    func(params)
    .then((result) => {
        const data = result.data;

        success(data);
    })
    .catch((error) => {
        console.log('saveContents error', error);
        failure(error);
    });
}

export const dbTimestamp = () => {
    return serverTimestamp();
}
