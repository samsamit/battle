## Experience

Player party will gain xp when enemy is killed.
Experience is calculated with the following:
-> Calculate average party level
-> Calculate baseExperience by multipying constant base experiense with party size
-> Calculate Levelgap between party avg level and enemy level
-> get experience multipler
--> If party avg level is higher that enemy then multipler is 1
--> Else multipler is level gap multiplied by 0.1
-> Experience gained is base experience multiplied by the multiplier
-> Then experience is divided amogns the members equally
