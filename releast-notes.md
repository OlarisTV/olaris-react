## Release 0.3.0
### General Tweaks

#### Optimisation

-   Updated all dependencies throughout.
-   Multiple style tweaks throughout.
-   Code optimization throughout.
-   Linting throughout.
-   Moving from `propTypes` to `flow` gradually.
-   Updated / resized placeholders.

#### User Accounts

-   Fixed user link not showing for admin accounts.
-   Refactored user accounts to utilize hooks.
-   Added admin tag to the admin user within user list.
-   Moved the create invite button out of the invite table to make it more visible.
-   Removed the ability to delete an admin user (or atleast attempt to).

#### Hooks
-   Gradually rebuilding all components to utilize hooks for increased performance.
-   Updating our Apollo mutations and queries to utilize the new `useMutation` & `useQuery` Hooks for increased performance.

#### Media Headers
-   Rebuilt media header for a more persistent feel.
-   Tweak Mark Series / Season as watched functionality.
-   More reusable throughout.

##  New Functionality

#### Chromecast

With our new chromecast reciever you now have the ability to cast your media to any chromecast, with built in controls and a new overlay you can control your media via the web app at the click of a button while keeping your playstates in sync.

#### Mismatched Media

Rematch media that has been matched to the wrong series or movie, using our new mismatch functionality which allows you to browse for your desired match.
