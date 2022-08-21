import { useState, useEffect } from 'react'
import EventEmitter from 'event-emitter'
import unfetch from 'isomorphic-unfetch'
import { Sema } from 'async-sema'

const tokenSema = new Sema(1)
const loggedInSema = new Sema(1)
const loginEvents = new EventEmitter()

const ONE_MINUTE = 1000 * 60;

let currentLoginState = null
let currentToken = null
let magic = null

async function getMagicToken (magicLinkKey) {
    await tokenSema.acquire()
    try {
        if (currentToken && currentToken.expiredAt > Date.now()) {
            return currentToken.token
        }

        magic = await loadMagicLink(magicLinkKey);
        const token = await magic.user.getIdToken()
        setToken(token)
        return token
    } finally {
        tokenSema.release()
    }
}

async function isLoggedIn (magicLinkKey) {
    await loggedInSema.acquire()

    try {
        if (currentLoginState !== null) {
            return currentLoginState
        }

        await getMagicToken(magicLinkKey)
        currentLoginState = true
    } catch (err) {
        currentLoginState = false
    } finally {
        loggedInSema.release()
    }

    return currentLoginState
}

function setToken (token, lifespan = ONE_MINUTE * 15) {
    currentToken = {
        token,
        expiredAt: Date.now() + lifespan - ONE_MINUTE
    }
}

export default function useAuth (magicLinkKey) {
    if (!magicLinkKey) {
        throw new Error('Magic Link publishableKey required as the first argument')
    }

        const [loggedIn, setLoggedIn] = useState(currentLoginState !== null ? currentLoginState : false)
    const [loading, setLoading] = useState(currentLoginState === null)
    const [error, setError] = useState(null)
    const [loggingIn, setLoggingIn] = useState(false)
    const [loggingOut, setLoggingOut] = useState(false)

    async function login (email) {
        setError(null)
        setLoggingIn(true)

        try {
            const magic = await loadMagicLink(magicLinkKey);
            const token = await magic.auth.loginWithMagicLink({ email })
            currentLoginState = true
            setToken(token)
            loginEvents.emit('loggedIn', true)
            setLoggedIn(true)
        } catch(err) {
            setError(err);
        } finally {
            setLoggingIn(false)
        }
    }

    async function logout () {
        setError(null)
        setLoggingOut(true)

        try {
            const magic = await loadMagicLink(magicLinkKey);
            await magic.user.logout()
            currentLoginState = null
            currentToken = null
            loginEvents.emit('loggedIn', false)
            setLoggedIn(false)
        } catch (err) {
            setError(err)
        } finally {
            setLoggingOut(false)
        }

        return currentLoginState === null
    }

    async function fetch (url, opts = {}) {
        const token = await getMagicToken(magicLinkKey)
        if (token) {
            opts.headers = opts.headers || {}
            opts.headers.Authorization = `Bearer ${token}`
        }

        return unfetch(url, opts)
    }

    useEffect(() => {
        if (!currentLoginState) {
            isLoggedIn(magicLinkKey)
                .then((loginState) => {
                    setLoggedIn(loginState)
                })
                .then(() => setLoading(false))
        }

        function watchLoggedIn (state) {
            setLoggedIn(state)
        }
        loginEvents.on('loggedIn', watchLoggedIn)

        return () => {
            loginEvents.off('loggedIn', watchLoggedIn)
        }
    }, [currentLoginState])

    return {
        loggedIn,
        loading,
        error,
        loggingIn,
        loggingOut,
        login,
        logout,
        fetch,
        loginEvents,
        magic
    }
}