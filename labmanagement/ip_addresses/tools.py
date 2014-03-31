'''
Created on Feb 10, 2014

@author: ivanitskiy
'''
import subprocess


def ping_response(address, timeout=1):
    rc  = subprocess.call("ping -c 1 -W %d %s"% (timeout, address),
                          shell=True,
                          stdout=open('/dev/null', 'w'),
                          stderr=subprocess.STDOUT)
    if rc == 0:
        return True
    else:
        return False