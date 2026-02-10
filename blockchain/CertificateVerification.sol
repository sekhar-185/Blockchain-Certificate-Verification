// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateVerification {

    enum Status { ACTIVE, REVOKED }

    struct Certificate {
        string certId;
        string sha256Hash;
        string ipfsCID;
        uint256 issuedAt;
        address issuer;
        Status status;
        bool exists;
    }

    mapping(string => Certificate) private certificates;

    event CertificateIssued(
        string certId,
        string sha256Hash,
        string ipfsCID,
        uint256 issuedAt,
        address issuer
    );

    event CertificateRevoked(
        string certId,
        uint256 revokedAt,
        address revokedBy
    );

    // Issue certificate
    function issueCertificate(
        string memory _certId,
        string memory _sha256Hash,
        string memory _ipfsCID
    ) public {
        require(!certificates[_certId].exists, "Certificate already exists");

        certificates[_certId] = Certificate({
            certId: _certId,
            sha256Hash: _sha256Hash,
            ipfsCID: _ipfsCID,
            issuedAt: block.timestamp,
            issuer: msg.sender,
            status: Status.ACTIVE,
            exists: true
        });

        emit CertificateIssued(
            _certId,
            _sha256Hash,
            _ipfsCID,
            block.timestamp,
            msg.sender
        );
    }

    // Revoke certificate (ONLY ISSUER)
    function revokeCertificate(string memory _certId) public {
        require(certificates[_certId].exists, "Certificate not found");

        Certificate storage cert = certificates[_certId];
        require(cert.status == Status.ACTIVE, "Certificate already revoked");
        require(msg.sender == cert.issuer, "Only issuer can revoke");

        cert.status = Status.REVOKED;

        emit CertificateRevoked(
            _certId,
            block.timestamp,
            msg.sender
        );
    }

    // Verify certificate
    function verifyCertificate(string memory _certId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            address,
            Status
        )
    {
        require(certificates[_certId].exists, "Certificate not found");

        Certificate memory cert = certificates[_certId];

        return (
            cert.certId,
            cert.sha256Hash,
            cert.ipfsCID,
            cert.issuedAt,
            cert.issuer,
            cert.status
        );
    }
}
